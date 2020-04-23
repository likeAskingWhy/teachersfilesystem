<template>
	<div class="systemsettings">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>系统管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">系统设置</span></el-breadcrumb-item>
		</el-breadcrumb>
		
		<p style="font-size: 15px;">是否开启教师编辑信息的权限：</p>
		<el-switch style="margin-left: 40px;" v-model="value1" active-text="系统已开放" inactive-text="系统已关闭"></el-switch>
		
		
	</div>
</template>

<script>
	export default {
		name: 'Systemsettings',
		data() {
			return {
				value1: true
			}
		}
	}
</script>

<style scoped="scoped">
	/* 面包屑留出下外边距 */
	.el-breadcrumb {
		margin-bottom: 20px;
	}
</style>
