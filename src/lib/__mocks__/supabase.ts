/**
 * Mock Supabase client for unit tests
 */

type MockQuery = {
  eq: ReturnType<typeof vi.fn>;
  is: ReturnType<typeof vi.fn>;
  or: ReturnType<typeof vi.fn>;
  order: ReturnType<typeof vi.fn>;
  range: ReturnType<typeof vi.fn>;
  single: ReturnType<typeof vi.fn>;
  select: ReturnType<typeof vi.fn>;
  insert: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  from: ReturnType<typeof vi.fn>;
};

function createMockQuery(): MockQuery {
  const query: Partial<MockQuery> = {};

  query.eq = vi.fn().mockReturnThis();
  query.is = vi.fn().mockReturnThis();
  query.or = vi.fn().mockReturnThis();
  query.order = vi.fn().mockReturnThis();
  query.range = vi.fn().mockReturnThis();
  query.single = vi.fn().mockResolvedValue({ data: null, error: null });
  query.select = vi.fn().mockReturnThis();
  query.insert = vi.fn().mockReturnThis();
  query.update = vi.fn().mockReturnThis();
  query.from = vi.fn().mockReturnThis();

  return query as unknown as MockQuery;
}

export function createMockSupabaseClient() {
  const mockQuery = createMockQuery();

  const mockClient = {
    from: vi.fn().mockReturnValue(mockQuery),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
    },
  };

  return { mockClient, mockQuery };
}