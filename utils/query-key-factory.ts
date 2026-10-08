export const createQueryKeyFactory = <T extends string>(resource: T) => ({
  all: [resource] as const,
  lists: () => [...createQueryKeyFactory(resource).all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    filters
      ? ([...createQueryKeyFactory(resource).lists(), filters] as const)
      : ([...createQueryKeyFactory(resource).lists()] as const),
  details: () => [...createQueryKeyFactory(resource).all, "detail"] as const,
  detail: (id: string | number) =>
    [...createQueryKeyFactory(resource).details(), id] as const,
});
