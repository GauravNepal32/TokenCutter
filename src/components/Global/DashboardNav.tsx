import { logout } from "@/lib/auth"
import NavLink from "./NavLink"
import Logout from "./Logout"

export function DashboardNav() {
    return (
        <nav className="grid pt-4 items-start px-2 text-sm gap-y-3 font-medium lg:px-4">
            <NavLink />
            <div className="mt-auto">
                <Logout />
            </div>
        </nav>
    )
}
