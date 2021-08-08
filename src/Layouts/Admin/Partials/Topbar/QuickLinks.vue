<template>
  <div class="nav-item ml-0">
    <li class="nav-item dropdown d-none d-md-inline-block ml-0">
      <a
        id="dashboardDropdown"
        aria-expanded="false"
        class="nav-link dropdown-toggle pl-0"
        data-toggle="dropdown"
        href="#"
      >
        <span class="profile-text">Dashboard</span>
      </a>
      <div
        aria-labelledby="dashboardDropdown"
        class="dropdown-menu dropdown-menu-left navbar-dropdown"
      >
        <a class="dropdown-item mt-3">Annual Reports</a>
        <a class="dropdown-item"
          >Revenue Reports <span class="badge badge-danger ml-auto badge-pill">3</span></a
        >
        <a class="dropdown-item"
          >IPO Reports <i class="dropdown-arrow mdi mdi-chevron-right"></i
        ></a>
        <a class="dropdown-item"
          >Finance Reports<i class="dropdown-arrow mdi mdi-chevron-right"></i
        ></a>
        <a class="dropdown-item">HR Reports</a>
      </div>
    </li>
  </div>
</template>
