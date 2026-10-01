const fs = require('fs');
const path = require('path');

// 1. Patch react-native-safe-area-context
const safeAreaCmakePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-safe-area-context',
  'android',
  'src',
  'main',
  'jni',
  'CMakeLists.txt'
);

if (fs.existsSync(safeAreaCmakePath)) {
  let content = fs.readFileSync(safeAreaCmakePath, 'utf8');
  if (!content.includes('c++_shared')) {
    content = content.replace(
      /target_link_libraries\(\s*\$\{LIB_TARGET_NAME\}\s*fbjni/g,
      'target_link_libraries(\n          ${LIB_TARGET_NAME}\n          c++_shared\n          fbjni'
    );
    fs.writeFileSync(safeAreaCmakePath, content, 'utf8');
    console.log('[Patch] Applied c++_shared patch to react-native-safe-area-context');
  }
}

// 2. Patch react-native-screens (src/main/jni)
const screensCmakePath1 = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-screens',
  'android',
  'src',
  'main',
  'jni',
  'CMakeLists.txt'
);

if (fs.existsSync(screensCmakePath1)) {
  let content = fs.readFileSync(screensCmakePath1, 'utf8');
  if (!content.includes('c++_shared')) {
    content = content.replace(
      /target_link_libraries\(\s*\$\{LIB_TARGET_NAME\}/g,
      'target_link_libraries(\n  ${LIB_TARGET_NAME}\n  c++_shared'
    );
    fs.writeFileSync(screensCmakePath1, content, 'utf8');
    console.log('[Patch] Applied c++_shared patch to react-native-screens (jni)');
  }
}

// 3. Patch react-native-screens (android/CMakeLists.txt)
const screensCmakePath2 = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-screens',
  'android',
  'CMakeLists.txt'
);

if (fs.existsSync(screensCmakePath2)) {
  let content = fs.readFileSync(screensCmakePath2, 'utf8');
  if (!content.includes('c++_shared')) {
    content = content.replace(
      /target_link_libraries\(rnscreens/g,
      'target_link_libraries(rnscreens\n    c++_shared'
    );
    fs.writeFileSync(screensCmakePath2, content, 'utf8');
    console.log('[Patch] Applied c++_shared patch to react-native-screens (root)');
  }
}
