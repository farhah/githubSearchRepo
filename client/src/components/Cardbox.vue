<template>
    <div>
    Hello {{userName}}
    </div>
</template>
<script>
export default {
  name: 'Cardbox',
  props: ['userName', 'userId']
};

</script>

