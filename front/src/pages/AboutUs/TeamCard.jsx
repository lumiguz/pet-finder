import {
    Avatar,
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import React from 'react'

const TeamCard = ({ person }) => {
    return (
        <Card
            sx={{
                width: '270px',
                height: '320px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
        >
            <CardContent
                sx={{
                    borderRadius: '8px',
                    padding: '8px',
                    gap: '16px',
                }}
            >
                <Stack alignItems="center" justifyContent="center">
                    <Avatar
                        src={person?.img}
                        sx={{
                            width: '170px',
                            height: '170px',
                        }}
                    />
                </Stack>
                <Stack p="11px" gap="10px">
                    <Typography
                        noWrap
                        gutterBottom
                        fontSize="25px"
                        component="div"
                        fontWeight={'bold'}
                        m="0"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '6px',
                        }}
                    >
                        {person?.fullname}
                        <Typography
                            fontSize="14px"
                            padding="2px"
                            color="#9b9fa0"
                        >
                            {person?.rol}
                        </Typography>
                    </Typography>
                    <Box
                        sx={{
                            borderTop: ' 1px solid #15c6dd',
                        }}
                    ></Box>
                    <Stack
                        direction="row"
                        gap="15px"
                        justifyContent="flex-start"
                        alignSelf="center"
                        width="100%"
                    >
                        <a target="_blank" href="https://www.instagram.com/">
                            <BsInstagram fontSize="25px" color="#357ABD" />
                        </a>
                        <a target="_blank" href="https://www.facebook.com/">
                            <BsFacebook fontSize="25px" color="#357ABD" />
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/">
                            <BsLinkedin fontSize="25px" color="#357ABD" />
                        </a>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default TeamCard
