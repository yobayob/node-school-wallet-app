import {
	Category,
	CategoryLogger,
	CategoryServiceFactory,
	CategoryDefaultConfiguration,
	LogLevel
} from 'typescript-logging';

// Optionally change default settings, in this example set default logging to Info.
// Without changing configuration, categories will log to Error.
CategoryServiceFactory.setDefaultConfiguration(new CategoryDefaultConfiguration(LogLevel.Info));

// Create categories, they will autoregister themselves.
// This creates one root logger, with 1 child sub category.
export const catRoot = new Category('service');
export const catProd = new Category('product', catRoot);

// Get a logger, this can be retrieved for root categories only (in the example above, the 'service' category).
export const log: CategoryLogger = CategoryServiceFactory.getLogger(catRoot);
