package com.kwanghwi.lastmessage.auth.dto;

import com.kwanghwi.lastmessage.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeResponse {

    private final Long userId;
    private final String phone;
    private final boolean phoneRegistered;

    public static MeResponse from(User user) {
        return new MeResponse(user.getId(), user.getPhone(), user.hasPhone());
    }
}
