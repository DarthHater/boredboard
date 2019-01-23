import roles from './roles';

export const deleteThread = [roles.ADMIN, roles.MOD];
export const deletePost = [roles.ADMIN, roles.MOD];
export const canPost = [roles.ADMIN, roles.MOD, roles.ELITE, roles.USER];
export const canEditPost = [roles.ADMIN, roles.MOD];
