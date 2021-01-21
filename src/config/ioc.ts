import LoggerJsonConsoleRepository from 'sosise-core/build/Repositories/Logger/LoggerJsonConsoleRepository';
import LoggerPrettyConsoleRepository from 'sosise-core/build/Repositories/Logger/LoggerPrettyConsoleRepository';
import LoggerService from 'sosise-core/build/Services/Logger/LoggerService';

/**
 * IOC Config, please register here your services
 */
const iocConfig = {
    /**
     * Normal means, that these registrations are non-singletons (sigletons are not supported atm.)
     *
     * How to register:
     * YourServiceName: () => new YourServiceName()
     *
     * How to use:
     * const logger = IOC.make('LoggerService') as LoggerService;
     */
    normal: {
        LoggerService: () => {
            if (process.env.APP_ENV === 'local') {
                return new LoggerService(new LoggerPrettyConsoleRepository());
            }

            return new LoggerService(new LoggerJsonConsoleRepository());
        }
    }
};

export default iocConfig;
