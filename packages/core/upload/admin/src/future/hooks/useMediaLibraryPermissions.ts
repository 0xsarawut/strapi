import { useRBAC } from '@strapi/admin/strapi-admin';

import { PERMISSIONS } from '../../constants';

/**
 * RBAC gate for the future Media Library UI. Mirrors the legacy hook of the
 * same name: the server already enforces every action route-side (assets and
 * folder operations share the asset permissions — folder create requires
 * `assets.create`, folder rename/move/delete require `assets.update`); this
 * hook is what keeps the UI honest so users don't discover a missing
 * permission through a 403.
 *
 * - `canCreate` — upload (files, from URL) and New folder
 * - `canUpdate` — edit details, replace, crop, move (dnd + bulk), delete
 *   (single + bulk), AI metadata — the `assets.update` action covers
 *   "Update (crop, details, replace) + delete" by definition
 * - `canDownload` / `canCopyLink` — the matching drawer actions
 */
export const useMediaLibraryPermissions = () => {
  const { main: _main, ...permissions } = PERMISSIONS;
  const { allowedActions, isLoading } = useRBAC(permissions);

  return {
    isLoading,
    canCreate: Boolean(allowedActions.canCreate),
    canUpdate: Boolean(allowedActions.canUpdate),
    canDownload: Boolean(allowedActions.canDownload),
    canCopyLink: Boolean(allowedActions.canCopyLink),
  };
};
