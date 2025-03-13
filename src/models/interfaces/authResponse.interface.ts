export interface AuthResponse {
    token: string;
    refreshToken: string;
    id: number;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    dateJoined: string | null;
    role: string | null;
    workplace: number | null;
    workStartTime: string | null;
    workEndTime: string | null;
}
  