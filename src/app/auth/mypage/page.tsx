'use client';

import React, { useMemo, useState } from 'react';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    Stack,
    Switch,
    Text,
    TextInput,
    Textarea,
    Title,
    Tabs,
    SimpleGrid,
    CopyButton,
    Tooltip,
} from '@mantine/core';
import { IconDots, IconCopy,IconLogout, IconCheck, IconKey, IconBell, IconUser } from '@tabler/icons-react';
import {useRouter} from "next/navigation";

type MyPageUser = {
    id: string;
    name: string;
    email: string;
    username?: string;
    bio?: string;
    avatarUrl?: string;
    plan: 'FREE' | 'PRO' | 'TEAM';
    createdAt: string; // ISO
};

type MyPageStats = {
    workspaces: number;
    projects: number;
    tasksTotal: number;
    tasksDone: number;
    streakDays: number;
};

type ActivityItem = {
    id: string;
    time: string;
    title: string;
    desc?: string;
    badge?: { label: string; color?: string };
};

const mockUser: MyPageUser = {
    id: 'usr_2Hk19a',
    name: '최재민',
    email: 'jaemin@taskground.dev',
    username: 'jaemin',
    bio: '노션 같은 협업 도구 만들고 있는 중. 자동 저장/충돌처리까지 제대로 가보자.',
    plan: 'PRO',
    createdAt: '2024-09-01T00:00:00.000Z',
};

const mockStats: MyPageStats = {
    workspaces: 3,
    projects: 8,
    tasksTotal: 142,
    tasksDone: 97,
    streakDays: 12,
};

const mockActivities: ActivityItem[] = [
    {
        id: 'a1',
        time: '방금',
        title: '“Board UX 개선” 작업을 완료했어요',
        desc: '프로젝트: TaskGround / 보드: Backlog',
        badge: { label: 'DONE', color: 'green' },
    },
    {
        id: 'a2',
        time: '2시간 전',
        title: '새 워크스페이스에 멤버를 초대했어요',
        desc: 'Workspace: Smartel Lab',
        badge: { label: 'INVITE', color: 'blue' },
    },
    {
        id: 'a3',
        time: '어제',
        title: '자동저장(debounce) 설정을 변경했어요',
        desc: '자동저장 1200ms → 800ms',
        badge: { label: 'SETTING', color: 'grape' },
    },
];

function StatCard({
                      label,
                      value,
                      hint,
                  }: {
    label: string;
    value: React.ReactNode;
    hint?: string;
}) {
    return (
        <Card withBorder radius="xl" p="md">
            <Stack gap={6}>
                <Text size="xs" c="dimmed">
                    {label}
                </Text>
                <Title order={3}>{value}</Title>
                {hint ? (
                    <Text size="xs" c="dimmed">
                        {hint}
                    </Text>
                ) : null}
            </Stack>
        </Card>
    );
}

function SectionHeader({
                           title,
                           icon,
                           right,
                       }: {
    title: string;
    icon?: React.ReactNode;
    right?: React.ReactNode;
}) {
    return (
        <Group justify="space-between" align="center">
            <Group gap={8}>
                {icon}
                <Title order={4}>{title}</Title>
            </Group>
            {right}
        </Group>
    );
}

export default function MyPage() {
    const router = useRouter();
    const [user, setUser] = useState<MyPageUser>(mockUser);
    const [stats] = useState<MyPageStats>(mockStats);
    const [activities] = useState<ActivityItem[]>(mockActivities);

    // settings
    const [autoSave, setAutoSave] = useState(true);
    const [autoSaveMs, setAutoSaveMs] = useState('800');
    const [emailNoti, setEmailNoti] = useState(true);
    const [pushNoti, setPushNoti] = useState(false);
    const [marketingNoti, setMarketingNoti] = useState(false);

    const completionPct = useMemo(() => {
        if (stats.tasksTotal <= 0) return 0;
        return Math.round((stats.tasksDone / stats.tasksTotal) * 100);
    }, [stats]);

    const planColor = user.plan === 'FREE' ? 'gray' : user.plan === 'PRO' ? 'violet' : 'indigo';

    return (
        <Box>
            <Box
                style={{
                    borderBottom: '1px solid var(--mantine-color-default-border)',
                    background: 'linear-gradient(180deg, rgba(99,102,241,0.10), rgba(99,102,241,0.00))',
                }}
            >
                <Container size="lg" py="xl">
                    <Grid gutter="xl" align="stretch">
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Card radius="xl" withBorder p="lg">
                                <Group justify="space-between" align="flex-start" wrap="nowrap">
                                    <Group wrap="nowrap" align="center" gap="md">
                                        <Avatar src={user.avatarUrl} size={72} radius="xl">
                                            {user.name?.slice(0, 1)}
                                        </Avatar>
                                        <Box>
                                            <Group gap={8} align="center">
                                                <Title order={3}>{user.name}</Title>
                                                {/*<Badge variant="light" color={planColor} radius="md">*/}
                                                {/*    {user.plan}*/}
                                                {/*</Badge>*/}
                                            </Group>
                                            <Text size="sm" c="dimmed">
                                                @{user.username} · {user.email}
                                            </Text>
                                            {user.bio ? (
                                                <Text size="sm" mt={6}>
                                                    {user.bio}
                                                </Text>
                                            ) : null}
                                            <Group mt="sm" gap="xs">
                                                <CopyButton value={user.id} timeout={1200}>
                                                    {({ copied, copy }) => (
                                                        <Tooltip label={copied ? '복사됨' : 'User ID 복사'} withArrow>
                                                            <Button
                                                                variant="light"
                                                                radius="xl"
                                                                leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                                                onClick={copy}
                                                                size="xs"
                                                            >
                                                                {copied ? 'Copied' : `ID: ${user.id}`}
                                                            </Button>
                                                        </Tooltip>
                                                    )}
                                                </CopyButton>
                                                <Button
                                                    variant="light"
                                                    radius="xl"
                                                    onClick={() => {}}
                                                    size="xs"
                                                >
                                                    <Text size="sm" mr={2}>
                                                        로그아웃
                                                    </Text>
                                                    <IconLogout size={16} />
                                                </Button>
                                            </Group>
                                        </Box>
                                    </Group>
                                </Group>
                            </Card>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <SimpleGrid cols={{ base: 2, md: 2 }} spacing="md">
                                <StatCard label="워크스페이스" value={stats.workspaces} />
                                <StatCard label="프로젝트" value={stats.projects} />
                            </SimpleGrid>

                            <Card withBorder radius="xl" p="md" mt="md">
                                <SectionHeader title="빠른 액션"/>
                                <Group mt="md" grow>
                                    <Button onClick={() => {
                                        router.push('/workspace/afd825b7-94b3-4d32-8caf-4402209701f2')
                                    }} radius="xl">워크스페이스 만들기</Button>
                                    <Button onClick={() => {
                                            router.push('/workspace/afd825b7-94b3-4d32-8caf-4402209701f2')
                                        }}
                                        radius="xl" variant="light">
                                        워크스페이스 관리
                                    </Button>
                                </Group>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Body */}
            <Container size="lg" py="xl">
                <Tabs defaultValue="profile" radius="xl" variant="outline">
                    <Tabs.List>
                        <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
                            프로필
                        </Tabs.Tab>
                        <Tabs.Tab value="security" leftSection={<IconKey size={16} />}>
                            보안
                        </Tabs.Tab>
                        <Tabs.Tab value="settings" leftSection={<IconDots size={16} />}>
                            설정
                        </Tabs.Tab>
                    </Tabs.List>

                    {/* Profile */}
                    <Tabs.Panel value="profile" pt="lg">
                        <Grid gutter="xl">
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <Card withBorder radius="xl" p="lg">
                                    <SectionHeader title="프로필 편집" />
                                    <Divider my="md" />
                                    <Grid>
                                        <Grid.Col span={{ base: 12, sm: 6 }}>
                                            <TextInput
                                                label="이름"
                                                value={user.name}
                                                onChange={(e) => setUser((p) => ({ ...p, name: e.currentTarget.value }))}
                                                radius="md"
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6 }}>
                                            <TextInput
                                                label="유저네임"
                                                value={user.username ?? ''}
                                                onChange={(e) => setUser((p) => ({ ...p, username: e.currentTarget.value }))}
                                                radius="md"
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextInput
                                                label="이메일"
                                                value={user.email}
                                                onChange={(e) => setUser((p) => ({ ...p, email: e.currentTarget.value }))}
                                                radius="md"
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <Textarea
                                                label="소개"
                                                minRows={3}
                                                value={user.bio ?? ''}
                                                onChange={(e) => setUser((p) => ({ ...p, bio: e.currentTarget.value }))}
                                                radius="md"
                                            />
                                        </Grid.Col>
                                    </Grid>

                                    <Group mt="lg" justify="flex-end">
                                        <Button radius="xl" variant="light">
                                            취소
                                        </Button>
                                        <Button radius="xl">저장</Button>
                                    </Group>
                                </Card>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <Card withBorder radius="xl" p="lg">
                                    <SectionHeader title="프로필 미리보기" />
                                    <Divider my="md" />
                                    <Group align="center" wrap="nowrap">
                                        <Avatar src={user.avatarUrl} size={56} radius="xl">
                                            {user.name?.slice(0, 1)}
                                        </Avatar>
                                        <Box>
                                            <Text fw={700}>{user.name}</Text>
                                            <Text size="sm" c="dimmed">
                                                @{user.username}
                                            </Text>
                                        </Box>
                                    </Group>
                                    <Text size="sm" mt="md">
                                        {user.bio || '소개를 입력하면 여기에 표시돼요.'}
                                    </Text>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </Tabs.Panel>

                    {/* Security */}
                    <Tabs.Panel value="security" pt="lg">
                        <Grid gutter="xl" >
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <Card withBorder radius="xl" p="lg">
                                    <SectionHeader title="비밀번호 변경" />
                                    <Divider my="md" />
                                    <Grid>
                                        <Grid.Col span={12}>
                                            <TextInput type="password" label="현재 비밀번호" radius="md" />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextInput type="password" label="새 비밀번호" radius="md" />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextInput type="password" label="새 비밀번호 확인" radius="md" />
                                        </Grid.Col>
                                    </Grid>
                                    <Group mt="lg" justify="flex-end">
                                        <Button radius="xl">변경</Button>
                                    </Group>
                                </Card>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <Card withBorder radius="xl" p="lg">
                                    <SectionHeader title="세션" />
                                    <Divider my="md" />
                                    <Stack gap="sm">
                                        <Group justify="space-between">
                                            <Box>
                                                <Text fw={600}>현재 로그인</Text>
                                                <Text size="sm" c="dimmed">
                                                    Chrome · Korea · 15분 전 활동
                                                </Text>
                                            </Box>
                                            <Badge variant="light" color="green">
                                                ACTIVE
                                            </Badge>
                                        </Group>
                                        <Button color="red" variant="light" radius="xl">
                                            모든 기기에서 로그아웃
                                        </Button>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </Tabs.Panel>

                    {/* Settings */}
                    <Tabs.Panel value="settings" pt="lg">
                        <Grid gutter="xl">
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <Card withBorder radius="xl" p="lg">
                                    <SectionHeader title="알림 설정" icon={<IconBell size={18} />} />
                                    <Divider my="md" />
                                    <Stack gap="md">
                                        <Group justify="space-between">
                                            <Text fw={600}>이메일 알림</Text>
                                            <Switch checked={emailNoti} onChange={(e) => setEmailNoti(e.currentTarget.checked)} />
                                        </Group>
                                        <Group justify="space-between">
                                            <Text fw={600}>푸시 알림</Text>
                                            <Switch checked={pushNoti} onChange={(e) => setPushNoti(e.currentTarget.checked)} />
                                        </Group>
                                        <Group justify="space-between">
                                            <Text fw={600}>마케팅 알림</Text>
                                            <Switch checked={marketingNoti} onChange={(e) => setMarketingNoti(e.currentTarget.checked)} />
                                        </Group>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </Box>
    );
}
