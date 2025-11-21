import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 300px;
  height: 100vh;
  background: #1e1e1e;
  border-right: 1px solid #3d3d3d;
  display: flex;
  flex-direction: column;
  color: #dcdcdc;
  font-size: 13px;
`;

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #3d3d3d;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #8c8c8c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionButton = styled.button<{ isActive?: boolean }>`
  width: 100%;
  padding: 8px 16px;
  background: ${(props) => (props.isActive ? "#363636" : "transparent")};
  border: none;
  color: #dcdcdc;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  &:hover {
    background: #2a2a2a;
  }
`;

const QuickAction = styled.div`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #2a2a2a;
  }
`;

const Icon = styled.span`
  width: 16px;
  text-align: center;
`;

export const ObsidianSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <Icon>📝</Icon>
        My Vault
      </SidebarHeader>

      <SidebarContent>
        <SidebarSection>
          <SectionTitle>Navigation</SectionTitle>
          <ActionButton>
            <Icon>📁</Icon>
            File explorer
          </ActionButton>
          <ActionButton>
            <Icon>🔍</Icon>
            Search
          </ActionButton>
          <ActionButton>
            <Icon>📄</Icon>
            Recent files
          </ActionButton>
        </SidebarSection>

        <SidebarSection>
          <SectionTitle>Quick Actions</SectionTitle>
          <QuickAction>
            <Icon>📄</Icon>
            New note
          </QuickAction>
          <QuickAction>
            <Icon>📁</Icon>
            New folder
          </QuickAction>
        </SidebarSection>
      </SidebarContent>
    </SidebarContainer>
  );
};
