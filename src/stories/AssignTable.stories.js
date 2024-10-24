import AssignTable from "../components/AssignTable.vue";

export default {
  title: 'AssignTable',
  component: AssignTable,
};

const Template = (args) => ({
  components: { AssignTable },
  setup() {
    return { args };
  },
  template: '<AssignTable v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
