<template>
  <div class="">
    <li class="nav-item dropdown circle-grid">
      <a
        id="notificationDropdown"
        class="nav-link count-indicator dropdown-toggle"
        data-toggle="dropdown"
        href="#"
      >
        <i class="mdi mdi-tune"></i>
      </a>
      <div
        aria-labelledby="notificationDropdown"
        class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
      >
        <a class="dropdown-item dropdown-header">
          <div class="wrapper">
            <h4 class="mb-1 font-weight-medium">Activity Controller</h4>
            <p class="mb-0 font-weight-medium float-left font-weight-light">
              You have 4 new notifications
            </p>
          </div>
          <span class="badge badge-pill badge-primary float-right">View all</span>
        </a>
        <a class="dropdown-item preview-item py-3">
          <div class="preview-thumbnail">
            <i class="mdi mdi-alert m-auto text-primary"></i>
          </div>
          <div class="preview-item-content">
            <h6 class="preview-subject font-weight-normal text-dark mb-1">Application Error</h6>
            <p class="font-weight-light small-text mb-0">Just now</p>
          </div>
        </a>
        <a class="dropdown-item preview-item py-3">
          <div class="preview-thumbnail">
            <i class="mdi mdi-settings m-auto text-primary"></i>
          </div>
          <div class="preview-item-content">
            <h6 class="preview-subject font-weight-normal text-dark mb-1">Settings</h6>
            <p class="font-weight-light small-text mb-0">Private message</p>
          </div>
        </a>
        <a class="dropdown-item preview-item py-3">
          <div class="preview-thumbnail">
            <i class="mdi mdi-airballoon m-auto text-primary"></i>
          </div>
          <div class="preview-item-content">
            <h6 class="preview-subject font-weight-normal text-dark mb-1">New user registration</h6>
            <p class="font-weight-light small-text mb-0">2 days ago</p>
          </div>
        </a>
      </div>
    </li>
  </div>
</template>
