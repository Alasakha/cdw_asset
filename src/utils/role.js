const Permissions = {
 VIEW_DASHBOARD: 'view_dashboard',
 EDIT_USER: 'edit_user',
 DELETE_POST: 'delete_post'
}

const Roles = {
        Admin: [Permissions.VIEW_DASHBOARD, Permissions.EDIT_USER, Permissions.DELETE_POST],
        Editor: [Permissions.VIEW_DASHBOARD, Permissions.EDIT_USER],
        Viewer: [Permissions.VIEW_DASHBOARD]
}

