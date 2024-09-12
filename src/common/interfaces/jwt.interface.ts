export interface PermissionJWT {
  id: number;
  entity: string;
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
}

export interface RoleJWT {
  id: number;
  name: string;
  permissions: PermissionJWT[];
}

export interface UserJWT {
  id: number;
  doc_number: number;
  role: RoleJWT;
  iat: number;
  exp: number;
}
