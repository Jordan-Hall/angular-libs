module.exports = {
  name: 'angular-libs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/angular-libs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
