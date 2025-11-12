import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Navbar } from '../../components/shared-ui/navbar';
import { useSideBarStore } from '../../zustand/sidebar-store';
import { Sidebar } from '../../components/shared-ui/sidebar';
import { useAuthStore } from '../../zustand/auth-store';

export const Route = createFileRoute('/_protected-routes')({
  component: RouteComponent,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  const { sideBarOpen, setSidebarOpen } = useSideBarStore();
  return (
    <>
      <Navbar setSideBarOpen={setSidebarOpen} />
      {sideBarOpen && <Sidebar setIsOpen={setSidebarOpen} />}
      <Outlet />
    </>
  );
}
