<script setup>
defineOptions({
    name: 'AppMenuItem'
});

import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const layoutState = ref({
    openMenuItems: [],
    staticMenuMobileActive: false,
    overlayMenuActive: false,
});

function toggleMenuItem(key) {
    const index = layoutState.value.openMenuItems.indexOf(key);
    if (index === -1) {
        layoutState.value.openMenuItems.push(key);
    } else {
        layoutState.value.openMenuItems.splice(index, 1);
    }
}

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: 0,
    },
    root: {
        type: Boolean,
        default: true,
    },
    parentItemKey: {
        type: String,
        default: null,
    },
});

const route = useRoute();
const itemKey = ref(null);

onBeforeMount(() => {

    itemKey.value = props.parentItemKey
        ? props.parentItemKey + "-" + props.index
        : String(props.index);
});

const isActiveMenu = computed(() =>
    layoutState.value.openMenuItems.includes(itemKey.value)
);

function itemClick(event, item) {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    if (
        (item.to || item.url) &&
        (layoutState.value.staticMenuMobileActive || layoutState.value.overlayMenuActive)
    ) {
    }

    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }

    toggleMenuItem(itemKey.value);
}

function checkActiveRoute(item) {
    return route.path === item.to;
}
</script>
<template>
    <li :class="{
        'layout-root-menuitem': root,
        'active-menuitem': isActiveMenu,
    }">
        <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">
            {{ item.label }}
        </div>

        <a v-if="(!item.to || item.items) && item.visible !== false" :href="item.url" @click="itemClick($event, item)"
            :class="item.class" :target="item.target" tabindex="0">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </a>

        <router-link v-else-if="item.to && !item.items && item.visible !== false" @click="itemClick($event, item)"
            :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
        </router-link>

        <transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.items" :key="i" :index="i" :item="child"
                    :parentItemKey="itemKey" :root="false"></app-menu-item>
            </ul>
        </transition>
    </li>
</template>


<style scoped lang="scss"></style>
