<template>
    <div class="loader-containear">
      <div class="loader"></div>
    </div>
  </template>
  
  <style scoped>
  .loader-containear{
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(3px) brightness(60%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #A4FFAF;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  
  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>