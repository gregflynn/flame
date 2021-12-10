const { useKubernetes, useDocker } = require('../../controllers/apps/docker');
const asyncWrapper = require('../../middleware/asyncWrapper');
const loadConfig = require('../loadConfig');

const loadIntegrationsApps = asyncWrapper(async () => {
  const {
    dockerApps: useDockerAPI,
    kubernetesApps: useKubernetesAPI,
  } = await loadConfig();
  
  let apps;

  if (useDockerAPI) {
    await useDocker(apps);
  }

  if (useKubernetesAPI) {
    await useKubernetes(apps);
  }

  return apps;
});

module.exports = loadIntegrationsApps;
