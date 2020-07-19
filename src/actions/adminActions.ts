export const setAdmin = (bool: boolean) =>
    ({
        type: 'SET_ADMIN',
        payload: bool,
    } as const);

export type AdminAction = ReturnType<typeof setAdmin>;
