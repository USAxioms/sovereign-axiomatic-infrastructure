export class AccessControl {
  constructor() {
    this.roles = new Map()
    this.userRoles = new Set()
  }

  // Define a role with permissions
  defineRole(name, permissions = []) {
    this.roles.set(name, new Set(permissions))
  }

  // Assign a role to the current user
  assignRole(name) {
    if (this.roles.has(name)) {
      this.userRoles.add(name)
    }
  }

  // Remove a role from the current user
  revokeRole(name) {
    this.userRoles.delete(name)
  }

  // Check if user has a specific permission
  hasPermission(permission) {
    for (const role of this.userRoles) {
      const perms = this.roles.get(role)
      if (perms && perms.has(permission)) {
        return true
      }
    }
    return false
  }

  // Guard a function
  guard(permission, fn) {
    if (!this.hasPermission(permission)) {
      throw new Error(`Access denied: missing permission '${permission}'`)
    }
    return fn()
  }
}
