import React, { useEffect, useState } from 'react'
import {
    Typography,
    Avatar,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserPets } from '../../redux/asyncActions/user/getUserPets'
import { cleanPetsData } from '../../redux/features/user/userSlice'
import Swal from 'sweetalert2'
import { editPet } from '../../redux/asyncActions/pet/editPet'
import Title from '../../components/petBrowser/Title'

const ProfileDetail = ({ menuItems, view, setView, children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userData, userPets } = useSelector((state) => state.user)

    const [selectedPet, setSelectedPet] = useState(undefined)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        if (userData != undefined) {
            const [name, lastName, ...rest] = userData.fullname.split(' ')
            setName(name)
            setLastName(lastName)
        }
    }, [userData])

    const handleMenuChange = (event, nextView) => {
        nextView && setView(nextView)
    }

    const handleViewProfile = (pet) => {
        const type = pet.type.toLowerCase()
        const id = pet._id

        navigate(`/${type}Pets/${id}`)
    }

    const handleEditPost = (pets) => {
        setEditPost(!editPost)
        setSelectedPet(pets)
    }

    const handleDelete = (pet) => {
        Swal.fire({
            title: `Do you really want to delete ${pet.name}?`,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(
                    editPet({ id: pet._id, newData: { status: 'Deleted' } })
                )
                Toast.fire({
                    icon: 'success',
                    title: 'Your post has been deleted',
                }).then(() =>
                    userData.pets.map((pet) => {
                        dispatch(cleanPetsData())
                        dispatch(getUserPets(pet))
                    })
                )
            }
        })
    }

    return (
        <Stack width="100%" gap={5} alignItems={'center'}>
            <Title title={'Account'} desc={`Hi ${userData.nickname}!`} />
            <Stack
                width="100%"
                py="65px"
                direction={'row'}
                justifyContent={'center'}
                sx={{
                    backgroundColor: '#E9F1F7',
                }}
            >
                <Stack
                    direction="row"
                    width="100%"
                    maxWidth="1440px"
                    height="100%"
                    gap={5}
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                >
                    {/* Profile Card */}
                    <Stack
                        width="320px"
                        height="630px"
                        backgroundColor="#FDFEFF"
                        boxShadow={5}
                        borderRadius={5}
                        alignItems="center"
                        p="24px"
                        gap="20px"
                    >
                        <Stack alignItems="center" width="100%">
                            <Stack
                                width="180px"
                                height="180px"
                                p="3px"
                                sx={{ border: '3px solid #3981BF' }}
                                borderRadius="50%"
                            >
                                <Avatar
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    src={userData?.img}
                                    alt={userData?.nickname}
                                />
                            </Stack>
                            <Typography fontSize="32px" color="#0D0D0D">
                                {name}
                            </Typography>
                            <Typography fontSize="24px" color="#0D0D0D">
                                {lastName}
                            </Typography>
                        </Stack>
                        <Stack
                            width="100%"
                            height="3px"
                            backgroundColor={'#D9E6F7'}
                        />
                        <Stack width="100%">
                            <ToggleButtonGroup
                                orientation="vertical"
                                value={view}
                                onChange={handleMenuChange}
                                exclusive
                            >
                                {menuItems.map((item) => (
                                    <ToggleButton
                                        // component={ToggleButton}
                                        key={item.id}
                                        value={item.id}
                                        color="primary"
                                        fullWidth
                                        sx={{
                                            display: 'flex',
                                            direction: 'row',
                                            p: 1,
                                            justifyContent: 'flex-start',
                                            gap: '20px',
                                            border: 'none',
                                        }}
                                    >
                                        <Stack width="22px" alignItems="center">
                                            {item.icon}
                                        </Stack>
                                        <Typography
                                            color="#0D0D0D"
                                            spacing={0}
                                            textTransform="none"
                                        >
                                            {item.title}
                                        </Typography>
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Stack>
                    </Stack>
                    {/* End Profile Card */}
                    {/* Side Card */}
                    <Stack
                        width="750px"
                        minHeight="450px"
                        backgroundColor="#FDFEFF"
                        py="50px"
                        px="26px"
                        boxShadow={5}
                        borderRadius={5}
                        gap="30px"
                    >
                        {children}
                    </Stack>
                    {/* End Side Card  */}
                </Stack>
            </Stack>
            <Stack
                height="100px"
                width={'100%'}
                sx={{
                    backgroundImage:
                        'url(https://res.cloudinary.com/diyk4to11/image/upload/v1664932414/Imagenes%20Dise%C3%B1o%20UX/Imagenes%20Landing%20page/huellitas_icwbmh.svg)',
                    backgroundRepeat: 'repeat',
                }}
            ></Stack>
        </Stack>
    )
}

export default ProfileDetail
