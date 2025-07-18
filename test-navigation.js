// 快速测试脚本：验证多对比评估导航逻辑
const testNavigation = () => {
  console.log('=== 测试多对比评估导航逻辑 ===\n');
  
  // 模拟数据配置
  const testData = [
    { contentId: '1', currentIndex: 1, totalCount: 3, prevId: undefined, nextId: '2', name: '第一条' },
    { contentId: '2', currentIndex: 2, totalCount: 3, prevId: '1', nextId: '3', name: '第二条' },
    { contentId: '3', currentIndex: 3, totalCount: 3, prevId: '2', nextId: undefined, name: '第三条' },
  ];
  
  // 模拟submitMultiCompareResult函数的逻辑
  const mockSubmitMultiCompareResult = (contentId) => {
    let nextContentId;
    
    if (contentId === '1') {
      nextContentId = '2';
    } else if (contentId === '2') {
      nextContentId = '3';
    } else if (contentId === '3') {
      nextContentId = undefined; // 没有下一条
    } else {
      nextContentId = undefined;
    }
    
    return {
      success: true,
      message: '提交成功',
      data: { nextContentId }
    };
  };
  
  // 测试每个数据项的提交逻辑
  testData.forEach(item => {
    console.log(`📋 当前：${item.name} (${item.currentIndex}/${item.totalCount})`);
    console.log(`   contentId: ${item.contentId}`);
    console.log(`   prevId: ${item.prevId || '无'}`);
    console.log(`   nextId: ${item.nextId || '无'}`);
    
    // 测试提交结果
    const submitResult = mockSubmitMultiCompareResult(item.contentId);
    console.log(`   提交后返回的nextContentId: ${submitResult.data.nextContentId || '无'}`);
    
    // 验证逻辑一致性
    const isConsistent = submitResult.data.nextContentId === item.nextId;
    console.log(`   ✅ 逻辑一致性: ${isConsistent ? '通过' : '❌ 失败'}`);
    console.log('');
  });
  
  console.log('=== 测试完成 ===');
};

// 运行测试
testNavigation();
