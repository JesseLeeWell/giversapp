import { registerPlugin } from '@capacitor/core';
const BranchDeepLinks = registerPlugin('BranchDeepLinks', {
    web: () => import('./web').then(m => new m.BranchDeepLinksWeb()),
});
export * from './definitions';
export { BranchDeepLinks };
//# sourceMappingURL=index.js.map