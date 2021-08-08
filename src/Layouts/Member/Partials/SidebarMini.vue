<template>
  <div>
    <div class="right-sidebar-toggler-wrapper">
      <div id="layout-toggler" class="sidebar-toggler"><i class="mdi mdi-settings"></i></div>
      <div id="chat-toggler" class="sidebar-toggler"><i class="mdi mdi-chat-processing"></i></div>
      <div class="sidebar-toggler">
        <a
          href="https://www.bootstrapdash.com/demo/star-admin-pro/src/docs/documentation.html"
          target="_blank"
          ><i class="mdi mdi-file-document-outline"></i
        ></a>
      </div>
      <div class="sidebar-toggler">
        <a href="https://www.bootstrapdash.com/product/star-admin-pro" target="_blank"
          ><i class="mdi mdi-cart"></i
        ></a>
      </div>
    </div>

    <div class="theme-setting-wrapper">
      <div id="theme-settings" class="settings-panel">
        <i class="settings-close mdi mdi-close"></i>
        <div class="d-flex align-items-center justify-content-between border-bottom">
          <p
            class="
              settings-heading
              font-weight-bold
              border-top-0
              mb-3
              pl-3
              pt-0
              border-bottom-0
              pb-0
            "
          >
            Template Demos
          </p>
        </div>
        <div class="demo-screen-wrapper">
          <a class="demo-thumb-image" href="demo_1/index.html">
            <!--          <img src="{{theme_url('shared/images/screenshots/default.jpg')}}"
             alt="demo image">-->
          </a>
        </div>
      </div>
    </div>

    <div id="right-sidebar" class="settings-panel">
      <i class="settings-close mdi mdi-close"></i>
      <div class="d-flex align-items-center justify-content-between border-bottom">
        <p
          class="settings-heading font-weight-bold border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0"
        >
          Friends
        </p>
      </div>
      <ul class="chat-list">
        <li class="list active">
          <div class="profile">
            <!--          <img src="{{theme_url('shared/images/faces/face1.jpg')}}" alt="image">-->
            <span class="online"></span>
          </div>
          <div class="info">
            <p>Thomas Douglas</p>
            <p>Available</p>
          </div>
          <small class="text-muted my-auto">19 min</small>
        </li>
        <li class="list">
          <div class="profile">
            <!--          <img src="{{theme_url('shared/images/faces/face2.jpg')}}" alt="image">-->
            <span class="offline"></span>
          </div>
          <div class="info">
            <div class="wrapper d-flex">
              <p>Catherine</p>
            </div>
            <p>Away</p>
          </div>
          <div class="badge badge-success badge-pill my-auto mx-2">4</div>
          <small class="text-muted my-auto">23 min</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script></script>
