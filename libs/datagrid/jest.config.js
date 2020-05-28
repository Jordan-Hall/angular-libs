module.exports = {
  name: 'datagrid',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datagrid',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
