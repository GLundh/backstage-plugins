import { loggerToWinstonLogger } from '@backstage/backend-common';
import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * Entrypoint for our plugin.
 *
 * @public
 */
export const statuspagePlugin = createBackendPlugin({
  pluginId: 'statuspage',
  register(env) {
    env.registerInit({
      deps: {
        config: coreServices.rootConfig,
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        discovery: coreServices.discovery,
      },
      async init({ config, logger, httpRouter, discovery }) {
        httpRouter.use(
          await createRouter({
            config,
            logger: loggerToWinstonLogger(logger),
            discovery,
          }),
        );
      },
    });
  },
});
