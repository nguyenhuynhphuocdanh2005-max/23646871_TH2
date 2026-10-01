const fs = require('fs');
const path = require('path');

const cmakePath = path.join(
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

if (fs.existsSync(cmakePath)) {
  let content = fs.readFileSync(cmakePath, 'utf8');
  if (!content.includes('c++_shared')) {
    content = content.replace(
      /target_link_libraries\(\s*\$\{LIB_TARGET_NAME\}\s*fbjni/g,
      'target_link_libraries(\n          ${LIB_TARGET_NAME}\n          c++_shared\n          fbjni'
    );
    fs.writeFileSync(cmakePath, content, 'utf8');
    console.log('[ShopAI] Applied c++_shared patch to react-native-safe-area-context');
  }
}
