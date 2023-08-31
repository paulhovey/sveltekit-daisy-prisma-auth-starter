export function doesRouteRequireAuthorization(routeId: string): boolean {
	return routeId.startsWith('/(app)');
}
