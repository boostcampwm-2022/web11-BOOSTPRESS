import styled from '@emotion/styled';
import { ReactComponent as UploadIcon } from 'assets/svg/upload.svg';
import { ReactComponent as TrashbinIcon } from 'assets/svg/Trashbin.svg';
import { ReactComponent as MailIcon } from 'assets/svg/mail.svg';
import { ReactComponent as TwitterIcon } from 'assets/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from 'assets/svg/facebook.svg';
import { ReactComponent as LinkedInIcon } from 'assets/svg/linkedin.svg';

import {
    FormEventHandler,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { blogType, snsType } from 'api/apiTypes';
import { getBlogInfo, getUserInfo, updateBlogInfo, uploadImage } from 'api/api';

const PersonalInfoManage = () => {
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [blogName, setBlogName] = useState('');
    const [nickname, setNickname] = useState('');
    const [profileFile, setProfileFile] = useState<string | File>('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');

    const setInitData = useCallback(async () => {
        if (userId === undefined) return;
        const blogInfo = await getBlogInfo(userId);

        const snsLink =
            blogInfo.snsLink?.reduce(
                (acc, curr) => ({ ...acc, [curr.snsName]: curr.link }),
                {} as { [name: string]: string },
            ) ?? {};

        setNickname(blogInfo.nickname);
        setBlogName(blogInfo.blogName);
        setBio(blogInfo.bio);
        setProfileFile(blogInfo.imageURL);

        setTwitterLink(snsLink.twitter ?? '');
        setFacebookLink(snsLink.facebook ?? '');
        setLinkedinLink(snsLink.linkedin ?? '');
    }, [userId]);

    useEffect(() => {
        getUserInfo().then((data) => setUserId(data.id));
    }, []);

    useEffect(() => {
        setInitData();
    }, [setInitData, userId]);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const snsLink: snsType[] = [];
        if (twitterLink !== '')
            snsLink.push({ snsName: 'twitter', link: twitterLink });
        if (facebookLink !== '')
            snsLink.push({ snsName: 'facebook', link: facebookLink });
        if (linkedinLink !== '')
            snsLink.push({ snsName: 'linkedin', link: linkedinLink });

        let imageURL;
        if (typeof profileFile === 'string') imageURL = profileFile;
        else {
            imageURL = (await uploadImage(profileFile)).imageURL;
            console.log(imageURL);
        }

        const dto: blogType = {
            login: '',
            blogName,
            nickname,
            imageURL,
            bio,
            snsLink,
        };

        await updateBlogInfo(dto);
        alert('??????????????? ???????????? ?????????????????????!');

        // TODO: ????????? ??????????????? ????????? ??? ??? ?????? ???
    };

    return (
        <Form onSubmit={onSubmit}>
            <InputSection
                title="????????? ??????"
                description="????????? ????????? ???????????? ????????? ???????????????"
            >
                <Input
                    type="text"
                    placeholder="????????? ????????? ???????????????"
                    value={blogName}
                    onChange={(e) => setBlogName(e.target.value)}
                />
            </InputSection>
            <InputSection
                title="?????????"
                description="????????? ???????????? ?????? ????????? ?????????"
            >
                <Input
                    type="text"
                    placeholder="???????????? ???????????????"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </InputSection>
            <ProfileInput>
                <h2>????????? ??????</h2>
                <ImageArea>
                    <img
                        src={
                            profileFile instanceof File
                                ? URL.createObjectURL(profileFile)
                                : profileFile
                        }
                        alt="profile"
                    />
                    <ImageUploadButton htmlFor="profile-input">
                        <UploadIcon />
                        <span>????????? ?????????</span>
                    </ImageUploadButton>
                    <ImageDeleteButton>
                        <TrashbinIcon />
                        <span>????????? ??????</span>
                    </ImageDeleteButton>
                    <input
                        id="profile-input"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                            if (!e.target.files) return;
                            setProfileFile(e.target.files[0]);
                        }}
                    />
                </ImageArea>
                <h4>???????????? ????????? ????????? ????????? ?????????</h4>
            </ProfileInput>
            <InputSection
                title="????????????"
                description="??????????????? ???????????????. markdown ??????"
            >
                <TextArea
                    placeholder="??????????????? ???????????????"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </InputSection>
            <InputSection
                title="?????? ??????"
                description="???????????? ????????? ????????? ?????? ???????????????"
            >
                <SocialInfoRow>
                    <MailIcon />
                    <Input
                        type="email"
                        placeholder="Email ??????"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </SocialInfoRow>
                <SocialInfoRow>
                    <TwitterIcon />
                    <Input
                        type="text"
                        placeholder="??? Twitter ?????????"
                        value={twitterLink}
                        onChange={(e) => setTwitterLink(e.target.value)}
                    />
                </SocialInfoRow>
                <SocialInfoRow>
                    <FacebookIcon />
                    <Input
                        type="text"
                        placeholder="??? Facebook ?????????"
                        value={facebookLink}
                        onChange={(e) => setFacebookLink(e.target.value)}
                    />
                </SocialInfoRow>
                <SocialInfoRow>
                    <LinkedInIcon />
                    <Input
                        type="text"
                        placeholder="??? LinkedIn ?????????"
                        value={linkedinLink}
                        onChange={(e) => setLinkedinLink(e.target.value)}
                    />
                </SocialInfoRow>
            </InputSection>

            <SubmitButton type="submit">??????</SubmitButton>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 100px;
    margin-left: 174px;
`;

const ImageArea = styled.div`
    display: flex;
    gap: 16px;
    input[type='file'] {
        display: none;
    }
    img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
    }
`;

const SocialInfoRow = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    gap: 4px;
    svg {
        height: 30px;
        width: 30px;
    }
`;

const Button = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    gap: 8px;
    height: 44px;
    border-radius: 4px;
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    span {
        width: max-content;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #4945ff;
`;

const ImageUploadButton = styled(Button)`
    background-color: #4945ff;
`.withComponent('label');

const ImageDeleteButton = styled(Button)`
    background-color: #d02b20;
`;

const ProfileInput = styled.div`
    width: 372px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: 'Noto Sans KR';
    color: #32324d;
    h2 {
        font-weight: 700;
        font-size: 15px;
        line-height: 16px;
    }
    h4 {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #666687;
    }
`;

interface TextInputProps {
    title: string;
    description: string;
}

const InputSection = ({
    title,
    description,
    children,
}: TextInputProps & PropsWithChildren) => (
    <TextInputWrapper>
        <h2>{title}</h2>
        {children}
        <h4>{description}</h4>
    </TextInputWrapper>
);

const TextArea = styled.textarea`
    width: 100%;
    height: 80px;
    border: 2px solid #dcdce4;
    border-radius: 4px;
    padding: 13px 16px;
    &:focus {
        outline: 2px solid #4945ff;
    }
`;

const Input = styled.input`
    &[type='text'],
    &[type='email'] {
        background: #ffffff;
        border: 2px solid #dcdce4;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding: 10px 0px;
        padding-left: 16px;
        width: 100%;
        &:placeholder {
            color: #666687;
        }
        &:focus {
            border: 2px solid #4945ff;
        }
    }
`;

const TextInputWrapper = styled.div`
    width: 372px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: 'Noto Sans KR';
    color: #32324d;
    h2 {
        font-weight: 700;
        font-size: 15px;
        line-height: 16px;
    }
    h4 {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #666687;
    }
`;

export default PersonalInfoManage;
