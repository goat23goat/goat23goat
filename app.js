document.getElementById('travelForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const days = document.getElementById('days').value;
    const budget = document.getElementById('budget').value;
    const interests = Array.from(document.getElementById('interests').selectedOptions).map(option => option.value);
    
    // 显示加载状态
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 生成中...';
    
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-0f0e86f5569a464c81342c9aa1985d6f'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: '你是一个专业的旅游规划助手。根据用户提供的目的地、天数、预算和兴趣，生成详细的旅游路线。'
                    },
                    {
                        role: 'user',
                        content: `我想去${destination}旅游${days}天，预算${budget}元，我的兴趣是：${interests.join(', ')}。请帮我规划详细的行程，包括景点推荐、交通建议和餐饮推荐。`
                    }
                ],
                stream: false
            })
        });
        
        if (!response.ok) {
            throw new Error('API请求失败');
        }
        
        const data = await response.json();
        const travelPlan = data.choices[0].message.content;
        
        // 显示结果并添加交互元素
        document.getElementById('travelPlan').innerHTML = travelPlan.replace(/\n/g, '<br>') + 
            '<div class="mt-3">' +
            '   <button class="btn btn-success me-2" onclick="savePlan()">保存路线</button>' +
            '   <button class="btn btn-primary" onclick="showMap()">查看地图</button>' +
            '</div>';
        
        // 添加保存路线功能
        function savePlan() {
            localStorage.setItem('savedPlan', travelPlan);
            alert('路线已保存！');
        }
        
        // 添加地图功能占位
        function showMap() {
            alert('地图功能即将推出！');
        }
        
        // 从DeepSeek API获取全景图片URL
        const panoramaResponse = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-0f0e86f5569a464c81342c9aa1985d6f'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: '你是一个旅游助手，请为指定景点提供360度全景图片URL。只返回URL，不要包含其他内容。'
                    },
                    {
                        role: 'user',
                        content: `请提供${destination}的360度全景图片URL`
                    }
                ],
                stream: false
            })
        });
        
        if (panoramaResponse.ok) {
            const panoramaData = await panoramaResponse.json();
            const panoramaUrl = panoramaData.choices[0].message.content;
            initPanoramaViewer(panoramaUrl);
        }
        document.getElementById('resultContainer').classList.remove('d-none');
        
    } catch (error) {
        alert('生成旅游路线时出错: ' + error.message);
    } finally {
        // 重置按钮状态
        submitButton.disabled = false;
        submitButton.textContent = '生成路线';
    }
});