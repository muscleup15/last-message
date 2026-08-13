package com.kwanghwi.lastmessage.user.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("users")
public class User {

    private static final int INITIAL_REMAINING_MESSAGE_COUNT = 10;

    @Id
    private Long id;

    private Long kakaoId;

    private String phone;

    private Integer remainingMessageCount;

    public static User createFromKakao(Long kakaoId) {
        return User.builder()
                .kakaoId(kakaoId)
                .remainingMessageCount(INITIAL_REMAINING_MESSAGE_COUNT)
                .build();
    }

    public boolean hasPhone() {
        return phone != null && !phone.isBlank();
    }

    public void registerPhone(String phone) {
        this.phone = phone;
    }

    public void decreaseRemainingCount() {
        if (remainingMessageCount == null || remainingMessageCount <= 0) {
            throw new IllegalStateException("No remaining message count");
        }
        this.remainingMessageCount = remainingMessageCount - 1;
    }

    public void addRemainingCount(int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }
        this.remainingMessageCount = remainingMessageCount + amount;
    }
}
