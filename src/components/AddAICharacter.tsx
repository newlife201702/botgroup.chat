import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { AICharacter, generateAICharacters } from "@/config/aiCharacters";

interface AddAICharacterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAICharacter({ isOpen, onClose }: AddAICharacterProps) {
  const [AICharacterName, setAICharacterName] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const handleAddAICharacter = () => {
    const AICharacters = generateAICharacters();
    const newAICharacters = AICharacters.concat([{ 
      id: 'ai' + (AICharacters.length + 10), 
      name: AICharacterName, 
      personality: "yuanbao",
      model: "qwen-plus",
      avatar: "/img/yuanbao.png",
      custom_prompt: customPrompt,
      tags: ["微信", "聊天", "新闻报道", "文字游戏","命令", "娱乐", "信息总结"]
    },]);
    console.log('newAICharacters', newAICharacters);
    localStorage.setItem('localStorageAICharacters', JSON.stringify(newAICharacters));
    onClose();
    toast.error('创建智能体成功');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="max-w-[100vw] w-full sm:max-w-[50vw] max-h-[90vh] flex flex-col p-0">
        <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg max-w-md mx-auto">
          {/* 智能体名称输入框 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="groupName" className="text-sm font-medium text-gray-700">
              智能体名称
            </label>
            <input
              type="text"
              id="groupName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入智能体名称"
              onChange={(e) => { setAICharacterName(e.target.value); }}
            />
          </div>

          {/* 自定义提示词输入框 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="groupDescription" className="text-sm font-medium text-gray-700">
              自定义提示词
            </label>
            <textarea
              id="groupDescription"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入自定义提示词"
              rows={3}
              onChange={(e) => { setCustomPrompt(e.target.value); }}
            />
          </div>

          {/* 创建按钮 */}
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddAICharacter}
          >
            创建智能体
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}