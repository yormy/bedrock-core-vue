<template>
  <div class="nav-item ml-0">
    <li class="nav-item dropdown d-none d-md-inline-block ml-0">
      <a
        id="ordersDropdown"
        aria-expanded="false"
        class="nav-link dropdown-toggle"
        data-toggle="dropdown"
        href="#"
      >
        <span class="profile-text">Orders</span>
      </a>
      <div
        aria-labelledby="ordersDropdown"
        class="dropdown-menu dropdown-menu-left navbar-dropdown"
      >
        <a class="dropdown-item mt-3"
          >View Orders <span class="badge badge-primary ml-auto badge-pill">13</span></a
        >
        <a class="dropdown-item"
          >Create Order<i class="dropdown-arrow mdi mdi-chevron-right"></i
        ></a>
        <a class="dropdown-item"
          >Cancel Order<i class="dropdown-arrow mdi mdi-chevron-right"></i
        ></a>
      </div>
    </li>
  </div>
</template>
