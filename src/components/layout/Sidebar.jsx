import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard"
  },
  {
    label: "Projects",
    path: "/projects"
  },
  {
    label: "Tasks",
    path: "/tasks"
  }
];

function Sidebar() {
  return (
    <aside className="sidebar">

      <nav>

        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;


// function Sidebar() {
//   return (
//     <aside className="sidebar">

//       <nav>

//         {/* <Link to="/dashboard">
//           Dashboard
//         </Link>

//         <Link to="/projects">
//           Projects
//         </Link>

//         <Link to="/tasks">
//           Tasks
//         </Link> */}

//         <NavLink to="/dashboard">
//         Dashboard
//         </NavLink>

//         <NavLink to="/projects">
//         Projects
//         </NavLink>

//         <NavLink to="/tasks">
//         Tasks
//         </NavLink>

//       </nav>

//     </aside>
//   );
// }

// export default Sidebar;