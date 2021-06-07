import axios from 'axios';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { 
    AddButton, 
    Channels, 
    Chats, 
    Header, 
    LogOutButton, 
    MenuScroll, 
    ProfileImg, 
    ProfileModal, 
    RightMenu, 
    WorkspaceButton, 
    WorkspaceModal, 
    WorkspaceName, 
    Workspaces, 
    WorkspaceWrapper } from './styles';
import fetcher from '../../utils/fetcher';
import Menu from '../../components/Menu';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

const Channel = loadable(() => import('../Channel'));
const DirectMessage = loadable(() => import('../DirectMessage'));

function Workspace({children}: {children: React.ReactNode}) {
    const {data: userData,error,mutate} = useSWR('http://localhost:3095/api/users', fetcher);

    const onLogout = () => {
        axios.post('http://localhost:3095/api/users/logout', null, {
            withCredentials:true
        }).then(() => {mutate(false), false});
    }
    
    const onClickUserProfile = () => null;
    const showUserMenu = null;
    const onClickCreateWorkspace = () => null;
    const toggleWorkspaceModal = () => null;
    
    if(!userData){
        return <Redirect to='/login' />
    }
    return (
        <div>
          <Header>
            <RightMenu>
              <span onClick={onClickUserProfile}>
                <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} />
                {showUserMenu && (
                  <MenuScroll style={{ right: 0, top: 38 }} /* show={showUserMenu} onCloseModal={onCloseUserProfile} */>
                    <ProfileModal>
                      <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                      <div>
                        <span id="profile-name">{userData.nickname}</span>
                        <span id="profile-active">Active</span>
                      </div>
                    </ProfileModal>
                    <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                  </MenuScroll>
                )}
              </span>
            </RightMenu>
          </Header>
          <WorkspaceWrapper>
            {/* <Workspaces>
              {userData?.Workspaces.map((ws) => {
                return (
                  <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                    <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                  </Link>
                );
              })}
              <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
            </Workspaces> */}
            <Channels>
              <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
              <MenuScroll>
                {/* <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
                  <WorkspaceModal>
                    <h2>Sleact</h2>
                    <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                    <button onClick={onClickAddChannel}>채널 만들기</button>
                    <button onClick={onLogout}>로그아웃</button>
                  </WorkspaceModal>
                </Menu> */}
                {/* <ChannelList />
                <DMList /> */}
              </MenuScroll>
            </Channels>
            <Chats>
              <Switch>
                <Route path="/workspace/channel" component={Channel} />
                <Route path="/workspace/dm" component={DirectMessage} />
              </Switch>
            </Chats>
          </WorkspaceWrapper>
          {/* <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
            <form onSubmit={onCreateWorkspace}>
              <Label id="workspace-label">
                <span>워크스페이스 이름</span>
                <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
              </Label>
              <Label id="workspace-url-label">
                <span>워크스페이스 url</span>
                <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
              </Label>
              <Button type="submit">생성하기</Button>
            </form>
          </Modal> */}
          {/* <CreateChannelModal
            show={showCreateChannelModal}
            onCloseModal={onCloseModal}
            setShowCreateChannelModal={setShowCreateChannelModal}
          />
          <InviteWorkspaceModal
            show={showInviteWorkspaceModal}
            onCloseModal={onCloseModal}
            setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
          />
          <InviteChannelModal
            show={showInviteChannelModal}
            onCloseModal={onCloseModal}
            setShowInviteChannelModal={setShowInviteChannelModal}
          /> */}
        </div>
      );
}

export default Workspace;