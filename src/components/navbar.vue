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
      { label: "Dashboard", ariaLabel: "Dashboard", href: "/dashboard"},
      { label: "Sign In", ariaLabel: "Sign In", href: "/signin"},
      { label: "Sign Out", ariaLabel: "Sign out", href: "/signout"},
    ]
  },
  {
    label: "Resources",
    bgColor: "#000",
    textColor: "#fff",
    links: [
      { label: "Services", ariaLabel: "Services", href: "/services"},
      { label: "Documentation", ariaLabel: "Documentation", href: "/documentation" },

    ]
  },
  {
    label: "Website",
    bgColor: "#000",
    textColor: "#fff",
    links: [
      {label: "Home", ariaLabel: "Home", href: "/"},
      { label: "About", ariaLabel: "About HereWeGo", href: "/about" },
      { label: "Contact", ariaLabel: "Contact HereWeGo", href: "/contact" }
    ]
  }
]
</script>
