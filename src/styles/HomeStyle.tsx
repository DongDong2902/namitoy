import styled from "styled-components";

export const HomeStyle = styled.div`
.platform {
    .row {
        .col-6 {
            text-align: center;
            cursor: pointer;

            &:hover {
                .box {                    
                    outline: 2px solid ${({theme}) => theme.colors.main};
                    img {                      
                        transform: scale3d(1.001, 1.001, 1);                       
                    }
                }
                .name-platform {
                    color: ${({theme}) => theme.colors.main};
                }
            }
        }
    }
}
`