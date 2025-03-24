import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { AICharacter, generateAICharacters } from "@/config/aiCharacters";
import { Group, groups } from "@/config/groups";

interface AddGroupProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarUpdateGroups: (groups: Group[]) => void;
  updateGroups: (groups: Group[]) => void;
  onSelectGroup?: (index: number, newGroups?: Group[]) => void;
}

export function AddGroup({ isOpen, onClose, sidebarUpdateGroups, updateGroups, onSelectGroup }: AddGroupProps) {
  const [groupName, setGroupName] = useState<string>('');
  const [groupDescription, setGroupDescription] = useState<string>('');
  // const [groupMembers, setGroupMembers] = useState<AICharacter[]>(generateAICharacters());
  const groupMembers = generateAICharacters();
  console.log('groupMembers', groupMembers);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleMemberSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const memberId = e.target.value;
    if (e.target.checked) {
      // 如果选中，添加到已选人员列表
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      // 如果取消选中，从已选人员列表中移除
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };

  const handleAddGroup = () => {
    const newGroups = groups.concat([{
      id: 'group' + groups.length,
      name: groupName,
      description: groupDescription,
      isGroupDiscussionMode: true,
      members: selectedMembers,
    }]);
    console.log('newGroups', newGroups);
    localStorage.setItem('localStorageGroups', JSON.stringify(newGroups));
    sidebarUpdateGroups(newGroups);
    updateGroups(newGroups);
    onClose();
    toast.error('创建群聊成功');
    onSelectGroup?.(newGroups.length - 1, newGroups);
  };

  // useEffect(() => {
  //   console.log('groupName', groupName);
  //   if (groupName) {
  //     setGroupMembers(generateAICharacters(groupName));
  //     console.log('generateAICharacters(groupName)', generateAICharacters(groupName));
  //   } else {
  //     setGroupMembers([]);
  //   }
  // }, [groupName]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="max-w-[100vw] w-full sm:max-w-[50vw] max-h-[90vh] flex flex-col p-0">
        <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg max-w-md mx-auto">
          {/* 群聊名称输入框 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="groupName" className="text-sm font-medium text-gray-700">
              群聊名称
            </label>
            <input
              type="text"
              id="groupName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入群聊名称"
              onChange={(e) => { setGroupName(e.target.value); }}
            />
          </div>

          {/* 群聊描述输入框 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="groupDescription" className="text-sm font-medium text-gray-700">
              群聊描述
            </label>
            <textarea
              id="groupDescription"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入群聊描述"
              rows={3}
              onChange={(e) => { setGroupDescription(e.target.value); }}
            />
          </div>

          {/* 群聊人员复选框选择 */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              选择群聊人员
            </label>
            <div className="flex flex-col space-y-2">
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={member.id}
                    value={member.id}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    onChange={handleMemberSelectionChange}
                    checked={selectedMembers.includes(member.id)}
                  />
                  <label htmlFor={member.id} className="ml-2 text-sm text-gray-700">
                    {member.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 创建按钮 */}
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddGroup}
          >
            创建群聊
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}