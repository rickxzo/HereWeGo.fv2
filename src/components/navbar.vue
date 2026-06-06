<template>
  <CardNav
    :logo="logo"
    logoAlt="Company Logo"
    :items="items"
    baseColor="#000"
    menuColor="#fff"
    buttonBgColor="#fff"
    buttonTextColor="#000"
    ease="power3.out"
  />
</template>

<script setup lang='ts'>
import CardNav from './cn.vue'
import logo from '../assets/logo.svg'

const items = [
  {
    label: "Platform",
    bgColor: "#000",
    textColor: "#fff",
    links: [
      { label: "Dashboard", ariaLabel: "Dashboard", to: "/dashboard"},
      { label: "DashPeek", ariaLabel: "Dashboard", to: "/dashpeek"},
      { label: "Sign In", ariaLabel: "Sign In", to: "/signin"},
      { label: "Sign Out", ariaLabel: "Sign out", to: "/signout"},
    ]
  },
  {
    label: "Resources",
    bgColor: "#000",
    textColor: "#fff",
    links: [
      { label: "Services", ariaLabel: "Services", to: "/services"},
      { label: "Documentation", ariaLabel: "Documentation", to: "/documentation" },

    ]
  },
  {
    label: "Website",
    bgColor: "#000",
    textColor: "#fff",
    links: [
      {label: "Home", ariaLabel: "Home", to: "/"},
      { label: "About", ariaLabel: "About HereWeGo", to: "/about" },
      { label: "Contact", ariaLabel: "Contact HereWeGo", to: "/contact" }
    ]
  }
]
</script>
