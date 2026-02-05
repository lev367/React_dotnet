import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export function useRestApi<T>(url: string) {
  //get
  const { data: items, refetch: refetchItems } = useQuery({
    queryKey: [url],
    queryFn: () => axiosInstance.get<T[]>(url).then((resp) => resp.data),
  });
  //get by id
  const getByIdAsync = (id: number) => {
    return useQuery({
      queryKey: [url, id],
      queryFn: () => {
        axiosInstance.get<T>(`${url}/${id}`).then((resp) => resp.data);
      },
    });
  };
  //create
  const { mutateAsync: createAsync } = useMutation({
    mutationFn: (itemToCreate: T) =>
      axiosInstance.post<T>(url, itemToCreate).then((resp) => resp.data),
  });
  const { mutateAsync: updateAsync } = useMutation({
    mutationFn: (itemToUpdate: T) =>
      axiosInstance.put<T>(url, itemToUpdate).then((resp) => resp.data),
  });
  const { mutateAsync: deleteAsync } = useMutation({
    mutationFn: (id: number) =>
      axiosInstance.delete(`${url}/${id}`).then((resp) => resp.data),
  });
  return {
    items,
    refetchItems,
    getByIdAsync,
    createAsync,
    updateAsync,
    deleteAsync,
  };
}
