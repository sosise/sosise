import IOCMakeException from 'sosise-core/build/Exceptions/IOC/IOCMakeException';
import LoggerConsoleRepository from 'sosise-core/build/Repositories/Logger/LoggerConsoleRepository';
import LoggerService from 'sosise-core/build/Services/Logger/LoggerService';

export default class IOC {
    /**
     * Get object from IOC
     */
    public static make(name: string): any {
        // Registration
        switch (name) {
            case 'LoggerService':
                return new LoggerService(
                    new LoggerConsoleRepository()
                );
            default:
                throw new IOCMakeException('IOC could not resolve class, please check IOC.ts and register needed name there', name);
        }
    }
}
