import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, PlusCircleIcon, MenuIcon, PanelLeftCloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import GitHubButton from 'react-github-btn';
import '@fontsource/audiowide';
import { Group, groups as groupsValue } from "@/config/groups";
import { AdSection } from './AdSection';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddGroup } from './AddGroup';

// 根据群组ID生成固定的随机颜色
const getRandomColor = (index: number) => {
  const colors = ['blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'red', 'orange', 'teal'];
  //增加hash
  const hashCode = index.toString().split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return colors[hashCode % colors.length];
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  selectedGroupIndex?: number;
  onSelectGroup?: (index: number) => void;
  updateGroups: (groups: Group[]) => void;
}

const Sidebar = ({ isOpen, toggleSidebar, selectedGroupIndex = 0, onSelectGroup, updateGroups }: SidebarProps) => {
  const [groups, setGroups] = useState(groupsValue);
  const [showAddGroup, setShowAddGroup] = useState(false);
  
  const sidebarUpdateGroups = (newGroups: Group[]) => {
    console.log('sidebarUpdateGroups_newGroups', newGroups);
    setGroups(newGroups);
  };
  
  return (
    <>
      {/* 侧边栏 - 在移动设备上可以隐藏，在桌面上始终显示 */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          "fixed md:relative z-20 h-full",
          isOpen ? "w-48 translate-x-0" : "w-0 md:w-14 -translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-full border-r bg-background rounded-l-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-border/40">
            <div className="flex-1 flex items-center">
              <span className={cn(
                "font-medium text-base text-foreground/90 transition-all duration-200 whitespace-nowrap overflow-hidden",
                isOpen ? "opacity-100 max-w-full mr-2 pl-3" : "opacity-0 max-w-0 md:max-w-0"
              )}>
                群列表
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className={cn(
                  "text-muted-foreground hover:text-primary",
                  isOpen ? "ml-auto" : "mx-auto md:ml-auto"
                )}
              >
                {isOpen ? <PanelLeftCloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-2">
            <nav className="space-y-1.5">
              {groups.map((group, index) => (
                <a 
                  key={group.id}
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectGroup?.(index);
                  }}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent/80 group",
                    !isOpen && "md:justify-center",
                    selectedGroupIndex === index && "bg-accent"
                  )}
                >
                  <MessageSquareIcon 
                    className={`h-5 w-5 flex-shrink-0 group-hover:opacity-80 text-${getRandomColor(index)}-500 group-hover:text-${getRandomColor(index)}-600`} 
                  />
                  <span className={cn(
                    "transition-all duration-200 whitespace-nowrap overflow-hidden text-foreground/90",
                    isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0 md:max-w-0"
                  )}>{group.name}</span>
                </a>
              ))}
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="#" 
                      className={cn(
                        "flex items-center gap-1 rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent/80 group mt-3",
                        !isOpen && "md:justify-center"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        // const newGroups = groups.concat([{
                        //   id: 'group3',
                        //   name: '💕AI树洞倾诉群',
                        //   description: '做一个温暖贴心的倾听者。当用户分享烦恼或秘密时，请表现出理解和同理心，提供情感支持而非简单建议。避免评判，保持尊重，适当提问以帮助用户更好地表达自己。记住，你的角色是提供安全的倾诉空间，而不是解决所有问题。',
                        //   isGroupDiscussionMode: true,
                        //   members: [ 'ai8','ai5', 'ai6',  'ai9', 'ai10'],
                        // }]);
                        // console.log('newGroups', newGroups);
                        // localStorage.setItem('localStorageGroups', JSON.stringify(newGroups));
                        // setGroups(newGroups);
                        // updateGroups(newGroups);
                        setShowAddGroup(true);
                      }}
                    >
                      <PlusCircleIcon className="h-5 w-5 flex-shrink-0 text-amber-500 group-hover:text-amber-600" />
                      <span className={cn(
                        "transition-all duration-200 whitespace-nowrap overflow-hidden text-foreground/90",
                        isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0 md:max-w-0"
                      )}>创建新群聊</span>
                    </a>
                  </TooltipTrigger>
                  {/* <TooltipContent>
                    <p>即将开放,敬请期待</p>
                  </TooltipContent> */}
                </Tooltip>
              </TooltipProvider>
            </nav>
          </div>
          
          {/* 广告位 */}
          {/* <AdSection isOpen={isOpen} /> */}

          {/* GitHub Star Button - 只在侧边栏打开时显示，放在底部 */}
          {/* <div className="px-3 py-2 mt-auto">
            <div className="flex items-center justify-left mb-3">
              <a href="/" className="flex items-center">
                <span 
                  style={{ fontFamily: 'Audiowide, system-ui', color: '#ff6600' }} 
                  className={cn(
                    "transition-all duration-200 whitespace-nowrap overflow-hidden",
                    isOpen ? "text-lg" : "text-xs max-w-0 opacity-0 md:max-w-0"
                  )}
                >
                  botgroup.chat
                </span>
              </a>
            </div>
            
            {isOpen && (
              <div className="flex items-center justify-left">
                <GitHubButton 
                  href="https://github.com/maojindao55/botgroup.chat"
                  data-color-scheme="no-preference: light; light: light; dark: light;"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star maojindao55/botgroup.chat on GitHub"
                >
                  Star
                </GitHubButton>
              </div>
            )}
          </div> */}
        </div>
      </div>
      
      {/* 移动设备上的遮罩层，点击时关闭侧边栏 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <AddGroup
        isOpen={showAddGroup}
        onClose={() => setShowAddGroup(false)}
        sidebarUpdateGroups={sidebarUpdateGroups}
        updateGroups={updateGroups}
        onSelectGroup={onSelectGroup}
      />
    </>
  );
};

export default Sidebar; 