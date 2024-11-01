import { masterService } from "@/services"
import authService from "@/services/auth.service"
import { useQuery } from "@tanstack/react-query"

export const useGetCurrentUser = () => {
   return {
      ...authService.getLoginInfoFromCookie(),
      isAuthenticated: authService.isLoggedIn(),
   }
}

export const useGetScheduleOptions = () => {
   const { data } = useQuery({
      queryKey: ['master', 'schedule_options'],
      queryFn: () => masterService.getScheduleOptions(),
   });
   return {
      scheduleOptions: data
   };
}