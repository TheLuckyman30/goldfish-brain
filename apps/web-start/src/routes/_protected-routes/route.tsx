import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Navbar } from '../../components/navbar';
import { useSideBarStore } from '../../zustand/sidebar-store';
import { Sidebar } from '../../components/sidebar';

export const Route = createFileRoute('/_protected-routes')({
  component: RouteComponent,
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
