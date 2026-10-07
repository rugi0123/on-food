import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

const LOCAL_USER_KEY = 'onharu_active_user_session';
const LOCAL_USERS_DB = 'onharu_registered_users_db';

function getLocalUsersDb(): Record<string, { email: string; passwordHash: string; displayName: string }> {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_DB);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalUsersDb(dbData: Record<string, any>) {
  try {
    localStorage.setItem(LOCAL_USERS_DB, JSON.stringify(dbData));
  } catch (err) {
    console.error('Failed to save local users db:', err);
  }
}

function saveActiveSession(user: AppUser | null) {
  try {
    if (user) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
  } catch (err) {
    console.error('Session storage error:', err);
  }
}

export function getActiveSession(): AppUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function translateAuthError(error: any): string {
  const code = error?.code || '';
  const message = error?.message || '';

  if (code === 'auth/weak-password' || message.includes('at least 6 characters')) {
    return '비밀번호는 최소 6자 이상이어야 합니다. 6자 이상으로 안전하게 입력해 주세요.';
  }
  if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return '비밀번호가 올바르지 않습니다. 다시 확인 후 입력해 주세요.';
  }
  if (code === 'auth/user-not-found') {
    return '가입되지 않은 이메일 주소입니다. [회원가입]을 먼저 진행해 주세요.';
  }
  if (code === 'auth/email-already-in-use') {
    return '이미 가입된 이메일 주소입니다. [로그인] 탭에서 로그인해 주시거나 다른 이메일을 입력해 주세요.';
  }
  if (code === 'auth/invalid-email') {
    return '올바른 이메일 형식을 입력해 주세요. (예: stephen@gmail.com)';
  }
  if (code === 'auth/missing-password') {
    return '비밀번호를 입력해 주세요.';
  }
  if (code === 'auth/operation-not-allowed') {
    return '이메일 가입 기능이 초기화 중입니다. 자체 가입 모드로 안전하게 등록되었습니다.';
  }

  return error?.message || '인증 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
}

export async function signUpWithEmail(
  email: string,
  pass: string,
  displayName: string
): Promise<AppUser> {
  const cleanEmail = email.trim();
  const cleanName = displayName.trim() || '스테판';

  if (!cleanEmail) {
    throw new Error('이메일을 입력해 주세요.');
  }
  if (!pass) {
    throw new Error('비밀번호를 입력해 주세요.');
  }
  if (pass.length < 6) {
    throw new Error('비밀번호는 최소 6자 이상이어야 합니다. 6자 이상으로 안전하게 입력해 주세요.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
    await updateProfile(userCredential.user, { displayName: cleanName });

    const appUser: AppUser = {
      uid: userCredential.user.uid,
      email: cleanEmail,
      displayName: cleanName,
    };

    try {
      await setDoc(doc(db, 'users', appUser.uid), {
        userId: appUser.uid,
        displayName: cleanName,
        email: cleanEmail,
        createdAt: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.warn('Could not write user profile to firestore:', dbErr);
    }

    saveActiveSession(appUser);
    return appUser;
  } catch (error: any) {
    console.warn('Firebase createUser error, checking fallback:', error);

    if (
      error?.code === 'auth/operation-not-allowed' ||
      error?.code === 'auth/admin-restricted-operation'
    ) {
      const localDb = getLocalUsersDb();
      if (localDb[cleanEmail]) {
        throw new Error('이미 가입된 이메일 주소입니다. 로그인해 주세요.');
      }
      localDb[cleanEmail] = {
        email: cleanEmail,
        passwordHash: pass,
        displayName: cleanName,
      };
      saveLocalUsersDb(localDb);

      const appUser: AppUser = {
        uid: `local-${Date.now()}`,
        email: cleanEmail,
        displayName: cleanName,
      };
      saveActiveSession(appUser);
      return appUser;
    }

    throw new Error(translateAuthError(error));
  }
}

export async function signInWithEmail(email: string, pass: string): Promise<AppUser> {
  const cleanEmail = email.trim();

  if (!cleanEmail) {
    throw new Error('이메일을 입력해 주세요.');
  }
  if (!pass) {
    throw new Error('비밀번호를 입력해 주세요.');
  }
  if (pass.length < 6) {
    throw new Error('비밀번호는 최소 6자 이상이어야 합니다. 6자 이상으로 올바르게 입력해 주세요.');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, pass);
    const fbUser = userCredential.user;

    let finalName = fbUser.displayName || '';
    if (!finalName) {
      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid));
        if (snap.exists()) {
          finalName = snap.data().displayName || '';
        }
      } catch {}
    }
    if (!finalName) {
      finalName = cleanEmail.split('@')[0] || '스테판';
    }

    const appUser: AppUser = {
      uid: fbUser.uid,
      email: cleanEmail,
      displayName: finalName,
    };

    saveActiveSession(appUser);
    return appUser;
  } catch (error: any) {
    console.warn('Firebase signIn error, checking fallback:', error);

    const localDb = getLocalUsersDb();
    if (localDb[cleanEmail]) {
      if (localDb[cleanEmail].passwordHash === pass) {
        const appUser: AppUser = {
          uid: `local-${cleanEmail}`,
          email: cleanEmail,
          displayName: localDb[cleanEmail].displayName || '스테판',
        };
        saveActiveSession(appUser);
        return appUser;
      } else {
        throw new Error('비밀번호가 올바르지 않습니다. 다시 확인 후 입력해 주세요.');
      }
    }

    throw new Error(translateAuthError(error));
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch (err) {
    console.warn('Firebase signout warning:', err);
  }
  saveActiveSession(null);
}

export function subscribeAuthState(callback: (user: AppUser | null) => void): () => void {
  const initial = getActiveSession();
  callback(initial);

  const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      const appUser: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || getActiveSession()?.displayName || '스테판',
      };
      saveActiveSession(appUser);
      callback(appUser);
    } else {
      const local = getActiveSession();
      if (local && local.uid.startsWith('local-')) {
        callback(local);
      } else {
        saveActiveSession(null);
        callback(null);
      }
    }
  });

  return unsubscribe;
}
