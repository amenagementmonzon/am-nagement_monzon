import { useState, useEffect } from 'react';
import supabase from './supabase';\nimport type { Tables } from './supabase';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

interface QueryOptions {
  orderBy?: { [K in string]: 'asc' | 'desc' };
  filter?: (row: any) => boolean;
}

export function useQuery<T extends TableName>(
  table: T,
  options: QueryOptions = {}
) {
  const [data, setData] = useState<TableRow<T>[] | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsPending(true);
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .order((options.orderBy || { created_at: 'desc' }) as any);

        if (error) throw error;

        setData((data || []) as TableRow<T>[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsPending(false);
      }
    }

    fetchData();
  }, [table]);

  return { data, isPending, error };
}

export function useMutation<T extends TableName>() {
  const [isPending, setIsPending] = useState(false);

  async function create(table: T, values: any) {
    setIsPending(true);
    const { data, error } = await supabase.from(table).insert(values).select().single();
    setIsPending(false);
    if (error) throw error;
    return data;
  }

  async function update(table: T, id: string, values: any) {
    setIsPending(true);
    const { data, error } = await supabase.from(table).update(values).eq('id', id).select().single();
    setIsPending(false);
    if (error) throw error;
    return data;
  }

  async function remove(table: T, id: string) {
    setIsPending(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    setIsPending(false);
    if (error) throw error;
  }

  return { create, update, remove, isPending };
}

